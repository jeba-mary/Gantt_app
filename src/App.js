import React from 'react';
import 'bryntum-gantt/gantt.stockholm.css';
import './App.css';
import BryntumGantt from './components/BryntumGantt';
import { ProjectModel } from 'bryntum-gantt';
import EditComponent  from './components/EditComponent';
import DemoEditor from './components/DemoEditer';


class App extends React.Component {

  handleEditClick = record => {
    this.refs.gantt.ganttInstance.editTask(record);
  };
  
  render() {
    const taskRenderer = ({ taskRecord }) => {
      if (taskRecord.isLeaf && !taskRecord.isMilestone) {
          return taskRecord.name;
      }
    }

    const project = new ProjectModel({
      transport : {
          load : {
              url : './data/tasks.json'
          }
      }
    });
    project.load();
    return (
      <>
      <BryntumGantt
      project      = {project}
      taskRenderer = {taskRenderer}
      columns      = {[
        { type : 'name', field : 'name', width : 250 },
        { text     : 'Edit<div class="small-text">(React component)</div>',
                    width    : 120,
                    editor   : false,
                    align    : 'center',

                    // Using custom React component
                    renderer : ({ record }) => record.isLeaf ?
                        <EditComponent
                            text={'Edit'}
                            onClick={() => this.handleEditClick(record)
                        }/>
                        : null},
        {
                    field    : 'draggable',
                    text     : 'Draggable<div class="small-text">(React editor)</div>',
                    align    : 'center',
                    width    : 120,
                    renderer : ({ value }) => value ? 'Yes' : 'No',
                    editor   : ref => <DemoEditor ref={ref}/>
                },
      ]}
    />
    </>
    )
  }
}

export default App;