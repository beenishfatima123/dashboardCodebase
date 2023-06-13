import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import FeatureImage from "../../components/courses/add/FeatureImage";
import Details from "../../components/courses/add/Details";
import ModuleContainer from "../../components/courses/add/ModuleContainer";
import SaveCard from "../../components/courses/add/SaveCard";
import { setCourseData } from "../../features/newCourseSlice";

const AddCourse = () => {
  const dispatch = useDispatch();

  const [validation, setValidation] = useState({});
  const { courseData, createCourseApiInfo } = useSelector(
    (state) => state.course
  );

  const removeModule = (mIndex) => {
    let remainingModules = courseData?.modules?.filter(function (mItem, index) {
      return index !== mIndex;
    });

    dispatch(
      setCourseData({
        ...courseData,
        modules: remainingModules,
      })
    );
  };

  const removeChapter = (mIndex, cIndex) => {
    let remainingChapter = courseData?.modules[mIndex]?.chapters?.filter(
      function (cItem, index) {
        return index !== cIndex;
      }
    );
    const _temp = {
      ...courseData,
      modules: courseData?.modules?.map((elem, pos) => {
        if (pos === mIndex)
          return {
            ...elem,
            chapters: remainingChapter,
          };
        else return elem;
      }),
    };
    dispatch(setCourseData(_temp));
  };

  const removeQuestion = (mIndex, qIndex) => {
    let remainingQuestions = courseData?.modules[mIndex]?.questions?.filter(
      function (cItem, index) {
        return index !== qIndex;
      }
    );
    const _temp = {
      ...courseData,
      modules: courseData?.modules?.map((elem, pos) => {
        if (pos === mIndex)
          return {
            ...elem,
            questions: remainingQuestions,
          };
        else return elem;
      }),
    };
    dispatch(setCourseData(_temp));
  };

  const deleteControl = (control, moduleIndex, chapterIndex, questionIndex) => {
    if (control === "module") removeModule(moduleIndex);
    else if (control === "chapter") removeChapter(moduleIndex, chapterIndex);
    else if (control === "question") removeQuestion(moduleIndex, questionIndex);
  };

  return (
    <Layout>
      <CustomTopInfo heading="Add Course" />
      {createCourseApiInfo?.loading ? (
        <Loader />
      ) : (
        <>
          <FeatureImage />
          <Details validation={validation} setValidation={setValidation} />
          <ModuleContainer deleteControl={deleteControl} />
          <SaveCard />
        </>
      )}
    </Layout>
  );
};

export default AddCourse;
