import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface SubDepartment {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
}

const departments: Department[] = [
  {
    id: 1,
    name: "Department A",
    subDepartments: [
      { id: 101, name: "Sub Department A1" },
      { id: 102, name: "Sub Department A2" }
    ]
  },
  {
    id: 2,
    name: "Department B",
    subDepartments: [
      { id: 201, name: "Sub Department B1" },
      { id: 202, name: "Sub Department B2" }
    ]
  }
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});

  const handleClick = (id: number) => {
    setOpen((prevOpen) => ({ ...prevOpen, [id]: !prevOpen[id] }));
  };

  return (
    <List>
      {departments.map((department) => (
        <div key={department.id}>
          <ListItem button onClick={() => handleClick(department.id)}>
            <ListItemText primary={department.name} />
            <ListItemIcon>
              {open[department.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
          </ListItem>
          <Collapse in={open[department.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((sub) => (
                <ListItem key={sub.id} sx={{ pl: 4 }}>
                  <ListItemText primary={sub.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
