import { memo, FC, useState } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Listbox as HListbox } from '@headlessui/react';
import cls from './Listbox.module.scss';

interface ListboxProps {
  className?: string;
}

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
] 


export const Listbox:FC<ListboxProps> = memo((props) => {
  const { className } = props;
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <HListbox value={selectedPerson} onChange={setSelectedPerson}>
      <HListbox.Button>{selectedPerson.name}</HListbox.Button>
      <HListbox.Options>
        {people.map((person) => (
          <HListbox.Option
            key={person.id}
            value={person}
            disabled={person.unavailable}
          >
            {person.name}
          </HListbox.Option>
        ))}
      </HListbox.Options>
    </HListbox>
  );
});
