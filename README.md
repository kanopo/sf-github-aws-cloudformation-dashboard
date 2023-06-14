# GitHub Cloudformation Dashboard - GCD

## TODOs
- [ ] select what template you want to build
- [ ] integration with aws for a proper understending about the deploy cicle
- [x] UI/UX
- [ ] possibility to upload inside a repo a specific set of files(templates uploading)
- [x] add authentication to avoid random bot s to interact with the dashboard(next-auth)
- [ ] check typescript for next-auth, at the moment i ue ts-ignore for avoiding failure in build
- [x] divide the unified ECR in many ECRs for each branch

## WIP
- [ ] github actions to delete stack on branch delete


## Ideas
- S3 bucket with different templates for different use cases(different languages) + adhoc customization / user uploaded templates
- add github token in the login part -> the dashboard change user on demand

## How to correctly branch
Edit the `buildspec.yml` file at line 17 replacing the string `dmitri-main` with the string `dmitri-{new branch name without the branchets}`.
The bottle neck is that Amazon ECR complains when the name of the ECR is more than 24/25 chars.
