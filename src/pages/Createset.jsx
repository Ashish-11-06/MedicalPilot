import React, { useState, useEffect } from "react";
import { Modal, Select, Spin, Row, Col, Input, Typography, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CreateQuizModal from "../Modals/CreateQuizModal";
import Test from "./Test";
import AllTestQuestions from "./AllTestQuestions";
import { getQuizCategories } from "../Redux/Slices/quizSlice";

const { Option } = Select;
const { Search } = Input;
const { Text } = Typography;

const Createset = () => {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const openModal = () => setIsQuizModalOpen(true);
  const closeModal = () => setIsQuizModalOpen(false);

  const dispatch = useDispatch();
  const { quizList, loading: quizLoading } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(getQuizCategories());
  }, [dispatch]);

  const showQuizModal = () => setIsQuizModalOpen(true);
  const showTestModal = () => setIsTestModalOpen(true);

  const handleCancel = () => {
    setIsQuizModalOpen(false);
    setIsTestModalOpen(false);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleQuizSelect = (value) => {
    console.log("Selected Quiz ID:", value);
    setSelectedQuizId(value);
  };

  return (
    <div style={{ 
      maxWidth: "1200px", 
      margin: "20px auto",
      padding: "0 20px",
      minHeight: "calc(100vh - 40px)" // Ensure full viewport height
    }}>
      {/* Search row */}
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={24}>
          <Search
            placeholder="Search questions or options..."
            allowClear
            enterButton="Search"
            size="large"
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>

      {/* Filter and action buttons row */}
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col xs={24} md={12}>
          {quizLoading ? (
            <Spin />
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Select Quiz:</label>
              <Select
                allowClear
                showSearch
                style={{ width: "100%" }}
                placeholder="Select a quiz"
                value={selectedQuizId}
                onChange={handleQuizSelect}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                notFoundContent={<Text type="secondary">No quizzes found</Text>}
              >
                {quizList?.map((quiz) => (
                  <Option key={quiz.id} value={quiz.id}>
                    {quiz.quiz_name}
                  </Option>
                ))}
              </Select>
            </div>
          )}
        </Col>
        <Col xs={24} md={12} style={{ textAlign: "right", marginTop: { xs: "16px", md: "0" } }}>
          <div style={{ display: "inline-flex", gap: "10px" }}>
            <button
              onClick={showQuizModal}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                color: "#fff",
                backgroundColor: "#1890ff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                minWidth: "120px"
              }}
            >
              Add Quiz
            </button>

            <button
              onClick={showTestModal}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                color: "#fff",
                backgroundColor: "#52c41a",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                minWidth: "120px"
              }}
            >
              Add Question
            </button>
          </div>
        </Col>
      </Row>

      {/* Modals */}
      {/* <Modal
        title="Create Quiz"
        open={isQuizModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Quizz onSuccess={handleCancel} />
      </Modal> */}

      <CreateQuizModal
        visible={isQuizModalOpen}
        onCancel={handleCancel}  // This will actually close the modal programmatically
        onSuccess={handleCancel} // Optional, good for when you want to handle after success too
        destroyOnClose
      />

      <Modal
        title="Add Question"
        open={isTestModalOpen}
        onCancel={handleCancel}
        footer={null}
        styles={{ body: { maxHeight: "60vh", overflowY: "auto" } }}
        destroyOnClose
      >
        <Test onSuccess={handleCancel} selectedQuizId={selectedQuizId} />
      </Modal>

      {/* Content area */}
      {selectedQuizId ? (
        <div style={{ margin: "20px 0" }}>
          <AllTestQuestions quizId={selectedQuizId} searchTerm={searchTerm} />
        </div>
      ) : (
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          textAlign: "center",
        }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <Text type="secondary" style={{ fontSize: "16px" }}>
                ⚠️ Please select a quiz from the dropdown <br></br>to view questions
              </Text>
            }
          />
        </div>
      )}
    </div>
  );
};

export default Createset;