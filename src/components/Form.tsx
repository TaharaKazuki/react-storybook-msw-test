import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

type Props = {
  onSubmit: (formData: Record<string, FormDataEntryValue>) => void;
};

type Option = {
  label: string;
  value: string;
};

export const Form = ({ onSubmit }: Props) => {
  const [options, setOptions] = useState<Option[]>([
    { label: 'option 1', value: 'option-1' },
    { label: 'option 2', value: 'option-2' },
    { label: 'option 3', value: 'option-3' },
  ]);

  useEffect(() => {
    fetch('/api/options')
      .then((res) => res.json())
      .then(({ options }) => {
        setOptions(options);
      });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <select style={{ marginBottom: '1rem' }} name="option">
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
