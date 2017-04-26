# swaggerToDto
swagger.yml to PHP DTO

dto_generator -h

dto_generator -p ~/projects/edukit/swagger/ -o ~/dto/test -n 'Edukit\Dto'  

## How it work

U need one, or more yml files with valid swagger contract inside, this program generate dto files from them.

- -p - location to swagger files. U can specify here single file or folder with such files, all yml files in folder will be parsed
- -o - place where generator will storage generated files. One folder from every parsed yml file will be created and one php file for every definitions in that yml files wil be placed in this file.
- -n - namespace that will be used to create every php file   