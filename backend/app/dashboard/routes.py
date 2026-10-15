import json
from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any
from app.database import fetch_all, fetch_one
from app.auth.dependencies import get_current_user
from app.collectors.nse_collector import fetch_nse_market_data

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/ticker")
async def get_market_ticker():
    """
    Returns the latest market ticker indices (SENSEX, NIFTY BANK, NIFTY IT).
    Provides real-time or cached ticker ticks.
    """
    try:
        # Get latest distinct symbols from database using parameterized query
        rows = await fetch_all(
            """
            SELECT DISTINCT ON (symbol) symbol, price, change_value, change_percent, collected_at
            FROM market_ticker
            ORDER BY symbol, collected_at DESC
            """
        )
        if rows:
            return {"status": "success", "data": rows}
    except Exception:
        pass
    
    # Fallback to direct collector feed
    ticks = await fetch_nse_market_data()
    return {"status": "success", "data": ticks}

@router.get("/indicators")
async def get_all_indicators(current_user: dict = Depends(get_current_user)):
    """
    Protected endpoint: Returns all 6 economic indicator panels with full historical data,
    comparison percentages, sources, and 'as of' dates.
    """
    try:
        rows = await fetch_all(
            """
            SELECT 
                indicator_code, indicator_name, primary_metric_label, primary_metric_value, primary_metric_change,
                secondary_metric_label, secondary_metric_value, secondary_metric_change,
                chart_data, source, observation_period, is_valid, is_stale, updated_at
            FROM indicator_snapshots
            ORDER BY id ASC
            """
        )
        # Parse jsonb chart_data if returned as string
        formatted_indicators = []
        for r in rows:
            item = dict(r)
            if isinstance(item.get("chart_data"), str):
                try:
                    item["chart_data"] = json.loads(item["chart_data"])
                except Exception:
                    pass
            formatted_indicators.append(item)
            
        return {
            "status": "success",
            "count": len(formatted_indicators),
            "data": formatted_indicators
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch indicators: {str(e)}")

@router.get("/indicator/{code}")
async def get_single_indicator(code: str, current_user: dict = Depends(get_current_user)):
    """Fetches a single indicator panel by its indicator_code."""
    row = await fetch_one(
        """
        SELECT 
            indicator_code, indicator_name, primary_metric_label, primary_metric_value, primary_metric_change,
            secondary_metric_label, secondary_metric_value, secondary_metric_change,
            chart_data, source, observation_period, is_valid, is_stale, updated_at
        FROM indicator_snapshots
        WHERE indicator_code = $1
        """,
        code
    )
    if not row:
        raise HTTPException(status_code=404, detail="Indicator not found")
    
    item = dict(row)
    if isinstance(item.get("chart_data"), str):
        try:
            item["chart_data"] = json.loads(item["chart_data"])
        except Exception:
            pass
    return {"status": "success", "data": item}
