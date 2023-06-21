# GitHub Cloudformation Dashboard - GCD


## Description
Every time a new branch is created, the buildspec variable `ECR_REPO` should be changed to the name of the repository that will be created in ECR. This is the repository that will be used to store the docker image that will be created by the buildspec file.

At the moment I can't edit the buildspec in the github actions workflow file, so it has to be done manually.
