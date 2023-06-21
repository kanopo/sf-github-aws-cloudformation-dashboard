# GitHub Cloudformation Dashboard - GCD

## Description
Every time a new branch is created, the buildspec variable `ECR_REPO` should be changed to the name of the repository that will be created in ECR. This is the repository that will be used to store the docker image that will be created by the buildspec file.

Same thing for the `URL` variable, it should be changed to the URL created mizing the DNS name and the breanch name.


