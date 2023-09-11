import React, { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';
import { getEmployeeNotInTeam, getTeamMembersSelectList, addTeamMember, removeTeamMember ,getProject} from '../../api/teamApi';
import { createImagePath } from '../../api/commonApi';

const AddMember = ({ open, onClose, teamId }) => {
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const getImage = (imagePath) => {
    return createImagePath(imagePath);
  };

  const fetchData = async () => {
    try {
      const employees = await getEmployeeNotInTeam(teamId);
      const teamMembers = await getTeamMembersSelectList(teamId);
      setSource(employees || []);
      setTarget(teamMembers || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open, teamId]);

  const onChange = (event) => {
    setSource(event.source);
    setTarget(event.target);
  };

  const handleMoveRight = (event) => {
    setSelectedEmployees(event.source);
  };

  const handleMoveLeft = (event) => {
    setSelectedMembers(event.target);
  };

  const saveChanges = async () => {
    const employeeIds = selectedEmployees.map((employee) => employee.id);
    const memberIds = selectedMembers.map((member) => member.id);
    try {
      await Promise.all(employeeIds.map((employeeId) => addTeamMember(teamId, employeeId)));
      await Promise.all(memberIds.map((memberId) => removeTeamMember(teamId, memberId)));
      fetchData();
      setSelectedEmployees([]);
      setSelectedMembers([]);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <>
      {open && (
        <div className="p-dialog p-component-overlay">
          <div className="p-dialog-content" style={{ width: '900px' }}>
            <div className="p-dialog-header">
              <h1>Manage Members</h1>
              <button className="p-dialog-close-icon p-link" onClick={() => onClose(false)}>
                <span className="pi pi-times" style={{ fontSize: '25px' }} />
              </button>
            </div>
            <div className="p-dialog-body">
              <PickList
                source={source}
                target={target}
                onChange={onChange}
                itemTemplate={itemTemplate}
                filter
                filterBy="name"
                responsive="true"
                sourceHeader="Employees"
                targetHeader="Team Members"
                sourceStyle={{ height: '30rem' }}
                targetStyle={{ height: '30rem' }}
                sourceFilterPlaceholder="Search by name"
                targetFilterPlaceholder="Search by name"
                showSourceControls={false}
                showTargetControls={false}
                className="custom-picklist"
                sourceSelection={selectedEmployees}
                targetSelection={selectedMembers}
                onSourceSelectionChange={handleMoveRight}
                onTargetSelectionChange={handleMoveLeft}
              />
            </div>
            <div className="p-dialog-footer">
              <button className="p-button p-component" onClick={saveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMember;