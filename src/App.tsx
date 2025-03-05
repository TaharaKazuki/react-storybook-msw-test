import './App.css';
import { Form } from './components/Form';

function App() {
  const handleSubmit = (formData: Record<string, FormDataEntryValue>) => {
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />
    </>
  );
}

export default App;
