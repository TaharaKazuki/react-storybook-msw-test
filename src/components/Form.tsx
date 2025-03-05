import { useEffect, useState } from 'react';

type Option = {
  label: string;
  value: string;
};

const Form = () => {
  const [options, setOptions] = useState<Option[]>([
    { label: 'option 1', value: 'option-1' },
    { label: 'option 2', value: 'option-2' },
    { label: 'option 3', value: 'option-3' },
  ]);

  useEffect(() => {
    fetch('/api/options')
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
      });
  });

  return (
    <form>
      <div>
        <select style={{ marginBottom: '1rem' }}>
          {options.map(({ label, value }, i) => (
            <option key={i} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
