# Autocomplete app front-end

This is the front-end of Autocomplete app where users can come and search for people name. Based on the response from API against the searched query names will be shown to the user.

## Installation

This is a dockerize react app and in order for this to run it needs the back-end of the app to be also working.

Please follow the steps in the root README file. 

On Successful launch of containers front-end can ve accessed by opening [http://localhost:3000](http://localhost:3000) in the browser.

## Description
User can search for people name in the search-box provided in header. API calls will be made to fetch the result against entered search query.
The fetched data is saved using Reducer so that on next same query search data can be served from reducer store rather than making a new API call again.
Debouncing is also used to limit the number of API calls on each key press.

- React js
- axios
- Material-Ui
```