### Remote Deployment

###### Introduction
A Basic form validation using Reactjs. Form has four input elements where users can input
* Social Security Number which should be a valid Swedish SSN Number
* Phone number which should be a valid Swedish Phone number
* Email which should be a valid email id
* Country from the dropdown

##### Behaviour
On every input, local storage is set/updated with the value that user input. Then run the form validation which will make sure that all the fields are set and validated. Once the form is validated, submit button gets enabled. Upon submit, local storage is cleared so user can start over.

Here the countries are fetched through the following REST API
https://restcountries.eu/rest/v2/all
