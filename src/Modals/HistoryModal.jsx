import React, { useEffect } from "react";
import { Modal, List, Spin, Alert } from "antd";

const HistoryModal = ({ open, onClose, history }) => {
    useEffect(() => {
      //console.log("🔵 Rendering HistoryModal with data:", history);
    }, [history]);
  
    // Ensure history is defined and has the expected structure
    const mainHistory = history?.mainHistory || [];
    const subHistories = history?.subHistories || [];
  
    return (
      <Modal title="History" open={open} onCancel={onClose} footer={null}>
        {mainHistory.length === 0 && subHistories.every(sub => sub.history.length === 0) ? (
          <Alert message="No history available" type="info" showIcon />
        ) : (
          <>
            {mainHistory.length > 0 && (
              <>
                <h3>Main Code History</h3>
                {mainHistory.map((item, index) => (
                  <div key={index}>
                    <strong>Code: {item.changes.code}</strong>
                    <p>Description: {item.changes.description}</p>
                    <p>Updated by: {item.updated_by}</p>
                    <p>Updated at: {new Date(item.updated_at).toLocaleString()}</p>
                    <hr />
                  </div>
                ))}
              </>
            )}
  
            {subHistories.length > 0 && (
              <>
                <h3>Sub-description Histories</h3>
                {subHistories.map((sub, index) => (
                  <div key={index}>
                    <h4>Sub-description: {sub.sub_description}</h4>
                    {sub.history.length > 0 ? (
                      sub.history.map((item, subIndex) => (
                        <div key={subIndex}>
                          <strong>Code: {item.changes.code}</strong>
                          <p>Sub-description: {item.changes.sub_description}</p>
                          <p>Updated by: {item.updated_by}</p>
                          <p>Updated at: {new Date(item.updated_at).toLocaleString()}</p>
                          <hr />
                        </div>
                      ))
                    ) : (
                      <p>No history available for this sub-description.</p>
                    )}
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </Modal>
    );
  };
export default HistoryModal;