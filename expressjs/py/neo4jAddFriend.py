from neo4j import GraphDatabase
import sys
#print ('Argument List:', str(sys.argv))
uri = "bolt://ec2-3-135-223-12.us-east-2.compute.amazonaws.com:7687"
db = GraphDatabase.driver(uri, auth=("neo4j", "12345678"))

userid = sys.argv[1]
friendid = sys.argv[2]

cqlNodeQuery = " MATCH (x: USER {userid: " + userid + "}), (y: USER {userid: " + friendid + "}) CREATE (x)-[r:Friend]->(y)"

with db.session() as graphDB_Session:
    nodes = graphDB_Session.run(cqlNodeQuery)