# GitHub Cloudformation Dashboard - GCD

## TODOs
- [ ] select what template you want to build
- [ ] integration with aws for a proper understending about the deploy cicle
- [x] UI/UX
- [ ] possibility to upload inside a repo a specific set of files(templates uploading)
- [x] add authentication to avoid random bot s to interact with the dashboard(next-auth)
- [ ] check typescript for next-auth, at the moment i ue ts-ignore for avoiding failure in build
- [x] divide the unified ECR in many ECRs for each branch
- [x] github actions to delete stack on branch delete

## WIP


## Ideas
- S3 bucket with different templates for different use cases(different languages) + adhoc customization / user uploaded templates
- add github token in the login part -> the dashboard change user on demand

## How to correctly branch
Edit the `buildspec.yml` file at line 17 replacing the string `dmitri-main` with the string `dmitri-{new branch name without the branchets}`.
The bottle neck is that Amazon ECR complains when the name of the ECR is more than 24/25 chars.

## How to delete a stack
1. In GitHub actions triggher the delete process
2. delete the branch

At the moment this process is not automated

## How to merge
Taking into consideration having two branches, main and dev, and wanting to perform the merge into the main branch, 
in the merge process we have a "conflict" becouse the main repo have a specific buildspec file and this file NEED to be preserved.


## procedura per effettuare un nuovo deploy su creazione di nuova branch
1. deve essere presente in main le action per il deploy on branch
1. si modifica il nome del branch nel buildpsec per far riferimento ad un nuovo ECR
1. si crea la nuova branch

Adesso provo a rendere il bottono "crea nuova branch" un "modifica buildpsec e crea nuova branch"


