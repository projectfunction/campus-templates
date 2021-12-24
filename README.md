# campus-templates

This repository contains a couple templates that is used by the Rejig LMS that powers campus. Contributions are welcome (a contribution guide will be up soon)


### Structure

The structure of the repository is simple. All top level folders in the `/templates/` folder should be given a [simple valid name](#simple-name-guide). 

For example:
```
projectfunction/campus-template
  - inventory.ctemplate.json
  - templates/
    - react
      - package.json
      - [...other files]
      - styles/
        - [...styles files]
    - web
      - index.html
      - styles.css
```

In the root of this repo, you'll need to update the `inventory.ctemplate.json` file to include the new template, following the [ctemplate structure](#ctemplate-structure).

### Simple Name Guide

The folder name for folders under the templates directory must not:
 - Contain capital letters
 - Start with a number
 - Contain spaces
 - Contain special characters

### Ctemplate Structure

Example:

```json
{
  "version": "v2.0.0-b01",
  "include": {
    "react-starter-kit" : "React Starter Kit"
  }
}
```
