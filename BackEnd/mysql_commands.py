import mysql.connector

def isOnline():
    try:
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
        )
        
        mydb.close()

        return True
    except Exception as e:
        return False