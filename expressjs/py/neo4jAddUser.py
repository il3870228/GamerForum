from neo4j import GraphDatabase
import sys

#print ('Argument List:', str(sys.argv))
uri = "bolt://ec2-3-135-223-12.us-east-2.compute.amazonaws.com:7687"
db = GraphDatabase.driver(uri, auth=("neo4j", "12345678"))

userid = sys.argv[1]
username = sys.argv[2]

cqlCreate = "CREATE" +  " (test:USER { userid: " + userid +  ","+ "username: "+ "\'" + username + "\'""})"


with db.session() as graphDB_Session:
    graphDB_Session.run(cqlCreate)