import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';

function Create(): JSX.Element {
  let history = useHistory();
  const { user, getIdTokenClaims } = useAuth0();

  interface IValues {
    [key: string] : any;
  }

  const [author, setAuthor] = useState<string>('');
  const [values, setValues] = useState<IValues>([])
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setAuthor(user.name)
    }
  }, [user])

  /*
  handleFormSubmission() method will receive and process the values from the input 
  fields before posting the information to the server.
  */

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      title: values.title,
      description: values.description,
      body: values.body,
      author
    }
    const submitSuccess: boolean = await submitForm(formData);
    setSubmitSuccess(submitSuccess);
    setValues({ ...values, formData });
    setLoading(false);
    setTimeout(() => {
      history.push('/');
    }, 1500)
  }

  /*
  To ensure that only authenticated users can send POST requests to the server, 
  getIdTokenClaims() method is used to retrieve a Token that was uniquely generated 
  to identify the currently logged in user. Once this is successful, 
  use the useHistory() hook to redirect the user back to the homepage of the application.
  */

  const submitForm = async (formData: {}) => {
    try {
      const accessToken = await getIdTokenClaims();
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blog/post`, {
        method: 'post',
        headers: new Headers({
          "Content-Type": "application/json",
          "Accept": "application/json",
          "authorization": `Bearer ${accessToken.__raw}`
        }),
        body: JSON.stringify(formData)
      });
      return response.ok;
    } catch (ex) {
      return false;
    }
  }

  const setFormvalues = (formValues: IValues) => {
    setValues({ ...values, formValues })
  }

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormvalues({ [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <div>
      
    </div>
  )
}

export default withRouter(Create);
