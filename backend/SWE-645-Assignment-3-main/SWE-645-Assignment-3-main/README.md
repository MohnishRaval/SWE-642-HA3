# GROUP PROJECT MEMBERS:

1. Name-Mohnish Raval GNumber-G01373613 emailID-mraval@gmu.edu
2. Name-Pranay Sharma GNumber-G01393761 emailID-Psharm24@gmu.edu
3. Name-Dipak Shetty GNumber-G01380853 emailID-dshetty@gmu.edu
4. Name-Anand Seshadri GNumber-G01351350 emailID-aseshad@gmu.edu

---

# PROJECT MEMBERS CONTRIBUTION:

a)Jenkinsfile and pipeline Implementation:Mohnish Raval, Dipak Shetty <br/>

b)Rancher Cluster creation and creating Deployment:Mohnish Raval,Pranay Sharma,Dipak Shetty,Anand Seshadri <br/>

c)Dockerfile creation and Implementation:Pranay Sharma,Anand Seshadri <br/>

d)Video Demonstration:Mohnish Raval <br/>

e)Documentation and screenshots: Pranay Sharma, Anand Seshadri <br/>

f)Github url and repository setup: Mohnish Raval <br/>

g)SpringBOOT API development-Mohnish,Anand,Dipak,Pranay <br/>

h)AWS RDS creation and Connection:Mohnish <br/>

g)Maven installation on Jenkins ec2 instance:Anand <br/>

---

# PROJECT SUBMISSION ZIP FILE FOLDER STRUCTURE:

The zip file contains the following:
a)videos folder-contains the video demonstrations of installation and demo of the CI-CD project <br/>
b)Rancher related files folder-contains following: <br/>
i)springcluster.yaml-kubeConfig file of the cluster named springcluster <br/>
ii)springdeployment.yaml-kubeConfig file of the deployment named springdeployment <br/>
c)SWE-645-assignment-3 folder-Contains the whole application containing source code including Dockerfile and Jenkinsfile(This code is already posted on github repo https://github.com/MohnishRaval/SWE-645-Assignment-3) <br/>
d)swe645_HW3_Report-Contains installation of maven,GET and POST API Call output on Postman <br/>

---

# Links:

1. Github repository Link-https://github.com/MohnishRaval/SWE-645-Assignment-3
   Description: This is my public github repository link which is used to integrate with Jenkins.

2. Installation and working Demo video (Installation and working demo) were created using teams meeting.
   a)SWE 645 HW3 Demo: The video contains demonstration and installation of the HW3 Demo
   Link-https://gmuedu-my.sharepoint.com/personal/mraval_gmu_edu/_layouts/15/onedrive.aspx?login_hint=mraval%40GMU%2EEDU&id=%2Fpersonal%2Fmraval%5Fgmu%5Fedu%2FDocuments%2FRecordings% 2FSWE%20645%20HW3%20Demo%2D20230427%5F161259%2DMeeting%20Recording%2Emp4&parentview=1

3. Rancher URLS(Links might not be accessible due to learner lab. These urls are just for reference and proof of implementation)
   a)springdeployment-https://44.194.169.64/k8s/clusters/c-j2cjh/api/v1/namespaces/default/services/http:springdeployment:8080/proxy/

4. Dockerhub url-https://hub.docker.com/u/19982707(This url is account of Mohnish Raval with ID 19982707)
5. Ec2 Instance with Jenkins and Rancher installed is named 'in1'
   a)For opening Rancher on this instance:https://44.194.169.64/dashboard/
   b)For opening Jenkins on this instance:http://44.194.169.64:8080

6. API ENDPOINTS
   a)On Localhost:
   i)Form Submit POST API endpoint(/form/submit)-http://localhost:8080/form/submit
   ii)Form View All Surveys GET API endpoint(/form/viewAllRecords)-http://localhost:8080/form/viewAllRecords
   b)On Kubernetes Cluster:
   i)Form Submit POST API endpoint(/form/submit)-https://ec2-44-194-169-64.compute-1.amazonaws.com/k8s/clusters/c- j2cjh/api/v1/namespaces/default/services/http:springdeployment:8080/proxy/form/submit
   ii)Form View All Surveys GET API endpoint(form/viewAllRecords)-https://ec2-44-194-169-64.compute-1.amazonaws.com/k8s/clusters/c- j2cjh/api/v1/namespaces/default/services/http:springdeployment:8080/proxy/form/viewAllRecords

7. Authorization: Rancher API Bear token will be required to implement GET and POST API when applicaiton is deployed on kubernetes cluster on Rancher otherwise 401 error will occur.
8. Rancher AUTH and API details:
   i)Access Key:token-j2lmq
   ii)Secret Key:m8ckms2sx7zfqlzc82jx8gxc98l5j5twgn6g4rzp4dbrqwtlfxzhf9
   iii)Bearer Token:token-j2lmq:m8ckms2sx7zfqlzc82jx8gxc98l5j5twgn6g4rzp4dbrqwtlfxzhf9

9. AWS RDS Endpoint:mysql://database-1.cjximbmndhmh.us-east-1.rds.amazonaws.com/sys

---

# MISCELLANEOUS DETAILS:

1. I have created Dockerfile and Jenkinsfile in root directory of my github repository
2. Docker image which was orignally used to create application was 19982707/swe-assignment-3:latest
3. The ec2 instances were created with inbound rules enabled for ports 8080,22,443,80 and the security group as vockey(default option in learner labs)
4. The Rancher clusters were created with Custom cluster method.
5. Inbound rules for RDS MySQL is enabled of Port 3306.
