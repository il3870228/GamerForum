from neo4j import GraphDatabase
import sys
import copy
import json

uri = "bolt://ec2-3-135-223-12.us-east-2.compute.amazonaws.com:7687"
db = GraphDatabase.driver(uri, auth=("neo4j", "12345678"))

userid = sys.argv[1]
cqlNodeQuery =  "MATCH (x:USER)-[Friend*2]->(y:USER) WHERE x.userid = " + userid +" RETURN y.username"

with db.session() as graphDB_Session:
    nodes = graphDB_Session.run(cqlNodeQuery)

obj = nodes.data()

result = []
for i in range(len(obj)):
   result.append(obj[i]['y.username'])

cqlNodeQuery =  "MATCH (n:USER) WHERE not (n)-[]-(:USER{userid:" + userid + " }) RETURN n.username;"
with db.session() as graphDB_Session:
    nodes = graphDB_Session.run(cqlNodeQuery)
obj = nodes.data()
for i in range(len(obj)):
   result.append(obj[i]['n.username'])
if (len(result)>7):
    result = result[0:7]
print(json.dumps(result))


