import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer,Legend } from 'recharts';
import data from './data.json';
import "./Dash.css";
import AddWidget from './AddWidget';

const Dashboard = ({searchQuery}) => {
  const [categories, setCategories] = useState([]);
  const [add,setAdd]=useState(false);
  const [Id, setId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setCategories(data);   
  }, []);
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(categories);
    } else {
      const filteredCategories = categories
        .map((category) => {
          
          const filteredWidgets = category.widgets.filter((widget) =>
            widget.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (category.category.toLowerCase().includes(searchQuery.toLowerCase()) ||filteredWidgets.length > 0) {
            return { ...category, widgets: filteredWidgets };
          }
          return null;
        })
        .filter((category) => category !== null);

      setSearchResults(filteredCategories);
    }
  }, [searchQuery, categories]);

  const handleButton=(id)=>{
  setAdd(true);
  setId(id);
 console.log(id);
  }

  const deleteWidget = (categoryIndex, widgetIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].widgets.splice(widgetIndex, 1);
    setCategories(updatedCategories);
  };

  const renderChart = (category, widget) => {
    switch (category.chartType) {
      case "BarChart":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={widget.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "LineChart":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={widget.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "PieChart":
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
        return (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={widget.data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5} // Adds padding between the slices
              >
                {widget.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className='outerest'>
      {searchResults.map((category, categoryIndex) => (
        <div key={categoryIndex} className='cards-outer'>
          <h2>{category.category}</h2>
          <div className='outer-card-container'>
            {category.widgets.map((widget, widgetIndex) => (
              <div key={widget.name} className='card'>
                <button onClick={() => deleteWidget(categoryIndex, widgetIndex)}>X</button>
                <h3>{widget.name}</h3>
                <p>{widget.text}</p>
                {renderChart(category, widget)}
              </div>
            ))}
            {category.widgets.length < 3 && (
              <div className="empty-card">
                {add &&categoryIndex===Id ? ( <AddWidget id={Id} categories={categories} setCategories={setCategories} />) 
                : (<button id={categoryIndex} onClick={() => handleButton(categoryIndex)}>+ Add Widget</button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;