import sys
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def create_database(user="postgres", password="password", host="localhost", port=5432, db_name="economic_dashboard"):
    try:
        conn = psycopg2.connect(
            dbname="postgres",
            user=user,
            password=password,
            host=host,
            port=port
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Check if database already exists
        cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s", (db_name,))
        exists = cursor.fetchone()
        if not exists:
            cursor.execute(f'CREATE DATABASE "{db_name}"')
            print(f"✅ Database '{db_name}' created successfully!")
        else:
            print(f"ℹ️ Database '{db_name}' already exists.")
        
        cursor.close()
        conn.close()
        return True
    except Exception as e:
        print(f"❌ Failed to connect or create database: {e}")
        return False

if __name__ == "__main__":
    pwd = sys.argv[1] if len(sys.argv) > 1 else "postgres"
    usr = sys.argv[2] if len(sys.argv) > 2 else "postgres"
    create_database(user=usr, password=pwd)
