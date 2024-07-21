import { useEffect, useState } from "react";
import "./Scheduler.css";

import {message, DatePicker, Select, Button,} from "antd";
import dayjs from "dayjs";
import { employees } from "../../data/mockData";
import { CloseCircleOutlined } from '@ant-design/icons';

interface SchedulerProps {
  onClose: () => void;
}

const Scheduler: React.FC<SchedulerProps> = ({ onClose }) => {
  const [employee, setEmployee]=useState('') ;
  const [selectedDate, setSelectedDate]=useState<dayjs.Dayjs | null>(null);
  const [date, setDate] = useState<string | string[]>();

  const onChange = (value: string) => {
    setEmployee(value);
    console.log(value);
  };

  useEffect(() => {
    setEmployee('');
    setSelectedDate(null);
    setDate('');
  }, []);

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  function getEmployeeNames() {
    return employees.map((employee) => ({
      value: employee.name,
      label: employee.name,
    }));
  }

  const onOk = (value: dayjs.Dayjs | null) => {
    setSelectedDate(value);
    console.log(value);
  };
  
  function handleSubmit(){
    if (employee===''){
      alert('Select an employee!')
    }
    else if(!selectedDate){
      alert('Select a date!')
    }
    else{
      console.log(employee); //to be connected to calendar dashboard
      console.log(date);
      
      message.success(`Scheduled meeting with ${employee} on ${date}`)
      setEmployee('');
      setSelectedDate(null);
      setDate('');
      onClose();
    }
  }
  return (
    <>
      <div className="scheduler-overlay">
        <div className="scheduler-content">
          <CloseCircleOutlined className="close-button" onClick={onClose}/>
          <h2>Schedule Meeting</h2>
          <div className="search">
            <p>With:</p>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={getEmployeeNames()}
            />
          </div>
          <div className="time">
            <p>Select Date and Time</p>
            <DatePicker minDate={dayjs()}
              showTime={{ format: "HH:mm" }}
              onChange={(_value, dateString) => {
                setDate(dateString);
              }}
              onOk={onOk}
            />
          </div>
          <Button type="primary" className="button" onClick={handleSubmit}>
            Schedule
          </Button>
        </div>
      </div>
    </>
  );
}

export default Scheduler;
