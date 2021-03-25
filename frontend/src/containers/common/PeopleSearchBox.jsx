// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import React, { useReducer, useCallback } from 'react';
import _ from "lodash";

// styles
import { makeStyles } from "@material-ui/core/styles";

// components
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import Snackbar from "../../components/Snackbar/index.jsx"

// api
import { getPeopleList } from '../../services/People';

// css definition
const useStyles = makeStyles((theme) => ({
  inputRoot: {
    width: 300,
    margin: '8px 0px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    },
  },
}));

// config
const ACTIONS = {
  API_RESPONSE: 'apiresponse'
}

// reducer
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.API_RESPONSE:
      return newQueryResult(state, action.payload)
      break;
    default:
      return state;
  }
}

function newQueryResult(state, payload) {
  let newState = _.cloneDeep(state);
  const data = {
    [payload.query]: payload.result
  };
  newState = {...newState, ...data}
  return newState;
}

const PeopleSearchBox = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState(false)
  const inputRef = React.useRef(null)
  const [state, dispatch] = useReducer(reducer, {});
  const [options, setOptions] = React.useState([]);

  const resetOptions = () => {
    setOptions([]);
  }

  const loadItems = async (query) => {
    try {
      // look for data in reducer, if not present then only make call to api
      const data = state[query];
      if (data === undefined) {
        const result = await getPeopleList(query)
        dispatch({type: ACTIONS.API_RESPONSE, payload: { result: result?.result || [], query }})
        resetOptions();
        setLoading(false);
      } else {
        setLoading(false);
        setOptions(data);
      }
    } catch (e) {
      setMessage(e?.data?.exception?.reasonMessage || "Something went wrong!");
    }
  }

  // Add a debounce to make sure Api is fired after 500ms from last key pressed
  const debouncedSearch = useCallback(_.debounce(loadItems, 500), [state]);

  const handleChange = (e) => {
    if (e.target.value && e.target.value.trim().length > 0) {
     setLoading(true);
     debouncedSearch(e.target.value);
    } else {
      resetOptions();
    }
  }

  React.useEffect(() => {
    const query = inputRef.current.value
    if (Object.keys(state).length && query) {
      setOptions(state[query] || [])
    }
  }, [state])

 return (
   <React.Fragment>
     <Snackbar
       message={message}
        reset={() => {
          setMessage(null)
        }}
        duration={4000}
     />
     <Autocomplete
      id="people-search"
      noOptionsText={"No result for this name!"}
      options={options}
      getOptionLabel={(option) => {
       return option.name;
      }}
      onClose={resetOptions}
      classes={{root: classes.inputRoot}}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={inputRef}
          fullWidth
          id="outlined-basic"
          variant="outlined"
          placeholder="Search People..."
          onChange={handleChange}
          margin="none"
          InputProps={{
           ...params.InputProps,
           endAdornment: (
            <React.Fragment>
             {loading ? (
              <CircularProgress color="inherit" size={20} />
             ) : (
               null
             )}
             {params.InputProps.endAdornment}
            </React.Fragment>
           ),
          }}
        />
      )}
     />
   </React.Fragment>
  );
}

export default PeopleSearchBox;
