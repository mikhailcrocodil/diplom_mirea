import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/config/config";
import Loading from "../UI/Loading/Loading";
import { Flex } from "antd";
import { Button } from "../UI/Button";
import { ModalStyled } from "../UI/Modal/ui/Modal.styled";
import { useTheme } from "../../utils/theme";
import { InputStyled } from "../Add/ui/AddMaterial/AddMaterial.styled";
import useToast from "../../shared/UI/Toast/useToast";
import { QuestionAddModel } from "../../api/models";
import { InfoTheme } from "./InfoTheme";
import { useTranslation } from "react-i18next";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";

export type AdaptiveTestInfoAnswerProps = {
  id: number;
  answer_text: string;
  is_correct: boolean;
  question_id: number;
};

export type AdaptiveTestInfoQuestionProps = {
  id: string;
  topic_id: string;
  difficulty: string;
  question_text: string;
  answers: AdaptiveTestInfoAnswerProps[];
};

export type AdaptiveTestInfoProps = {
  id: number;
  subject_id: number;
  topic_text: string;
  topicQuestions: AdaptiveTestInfoQuestionProps[];
};

const AdaptiveTestCourseInfo = () => {
  const { t } = useTranslation();
  const courseId = useParams().courseId;
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<AdaptiveTestInfoProps[] | null>(null);
  const [courseTitle, setCourseTitle] = useState("");
  const openNotification = useToast();
  const handleGetAdaptiveTestInfo = async () => {
    setLoading(true);
    const courseRes = await axios.post(
      `${BASE_URL}/course/get-course`,
      {
        courseId: Number(courseId),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const course_title = courseRes.data.course[0].title;
    setCourseTitle(course_title);
    if (course_title) {
      try {
        const res = await axios.post(
          `${BASE_URL}/course/get-adaptive-test-course-info`,
          {
            userId: Number(userId),
            course_title: courseRes.data.course[0].title,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (res.status === 401) {
          throw new Error("Доступ запрещен");
        }
        if (res.status === 200) {
          setInfo(res.data.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (courseId) handleGetAdaptiveTestInfo();
  }, [courseId]);

  const [currentQuestion, setCurrentQuestion] = useState<QuestionAddModel>({
    question: {
      question_text: "",
      difficulty: 1,
    },
    answers: [],
  });
  const handleAddAnswer = () => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: [
        ...prevQuestion.answers,
        { answer_text: "", is_correct: false },
      ],
    }));
  };

  const { theme } = useTheme();
  const [themeTitle, setThemeTitle] = useState("");
  const [addThemeOpen, setAddThemeOpen] = useState(false);
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);

  const handleOpenModalTheme = () => {
    setAddThemeOpen(true);
  };
  const handleCloseModalTheme = () => {
    setAddThemeOpen(false);
  };

  const handleOpenModalQuestion = () => {
    setCurrentQuestion({
      question: {
        question_text: "",
        difficulty: 1,
      },
      answers: [],
    });
    setAddQuestionOpen(true);
  };
  const handleCloseModalQuestion = () => {
    setAddQuestionOpen(false);
  };

  const handleAddTheme = async (e: any) => {
    e.preventDefault();
    const res = await axios.post(
      `${BASE_URL}/course/add-theme-for-adaptive-test`,
      {
        theme_title: themeTitle,
        course_title: courseTitle,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.status === 200) {
      openNotification({
        type: "success",
        message: "Тема адаптивного теста успешно добавлена",
      });
    }
    await handleGetAdaptiveTestInfo();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    info && (
      <Flex vertical gap={20}>
        <Flex vertical gap={16}>
          <h3 style={{ fontWeight: 500 }}>
            Информация об адаптивном тесте курса &quot;{courseTitle}&quot;
          </h3>
          <h4 style={{ fontWeight: 450 }}>
            Существующие вопросы представлены ниже
          </h4>
          {info.length !== 10 && (
            <>
              <Button
                onClick={handleOpenModalTheme}
                style={{ marginBottom: "20px", width: "fit-content" }}
                text={"Добавить тему"}
              />
              {/*<ConfirmModal*/}
              {/*  open={isModalConfirm}*/}
              {/*  title={t("tooltips.remove_theme")}*/}
              {/*  handleCancel={handleCancel}*/}
              {/*  handleOk={handleOk}*/}
              {/*/>*/}
              <ModalStyled
                width={"600px"}
                theme={theme}
                onCancel={handleCloseModalTheme}
                title={"Добавить тему для адаптивного теста"}
                open={addThemeOpen}
                footer={null}
              >
                <form onSubmit={handleAddTheme}>
                  <Flex vertical gap={20}>
                    <InputStyled
                      value={themeTitle}
                      onChange={(e) => setThemeTitle(e.target.value)}
                      placeholder={"Введите название темы"}
                    />
                    <Button
                      text={"Добавить тему"}
                      style={{ width: "fit-content" }}
                      type={"submit"}
                    />
                  </Flex>
                </form>
              </ModalStyled>
            </>
          )}
        </Flex>
        {info.map((topic, index) => (
          <InfoTheme
            handleGetAdaptiveTestInfo={handleGetAdaptiveTestInfo}
            key={topic.id}
            addQuestionOpen={addQuestionOpen}
            currentQuestion={currentQuestion}
            handleCloseModalQuestion={handleCloseModalQuestion}
            handleOpenModalQuestion={handleOpenModalQuestion}
            handleAddAnswer={handleAddAnswer}
            setCurrentQuestion={setCurrentQuestion}
            index={index}
            topic={topic}
          />
        ))}
      </Flex>
    )
  );
};

export default AdaptiveTestCourseInfo;
