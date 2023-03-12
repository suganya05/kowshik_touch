import React, { useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Breadcrumbs,
  Button,
  Modal,
  CircularProgress,
} from "@mui/material";

import { Link, useParams, useSearchParams } from "react-router-dom";
import { useGetClassByIdQuery } from "store/slices/classSlice";
import { useGetAllSectionQuery } from "store/slices/sectionSlice";
import { ChooseForm, FillUpForm, MatchForm } from "components";
import FillupQuestion from "components/FillupQuestion";
import ChooseQuestion from "components/ChooseQuestion";
import MatchQuestion from "components/MatchQuestion";
import CloseIcon from "@mui/icons-material/Close";
import SubjectFrom from "components/SubjectForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ClassById = () => {
  const { classId } = useParams() as { classId: string };
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentChapter = searchParams.get("chapter") as string;
  const currentSubject = searchParams.get("subject") as string;
  const currentQuestionType = searchParams.get("questionType") as string;
  const { data, isLoading, isError } = useGetClassByIdQuery(classId);
  const {
    data: sectionData,
    refetch,
    isLoading: sectionLoading,
    isError: sectionError,
  } = useGetAllSectionQuery({
    chapterNo: currentChapter,
    subject: currentSubject,
    standard: classId,
    title: currentQuestionType,
  });

  const renderSubjects = (
    <Grid
      container
      spacing={2}
      style={{ display: "grid", gridTemplateColumns: "1fr" }}
    >
      <Box style={{ display: "flex", justifyContent: "end" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Add Subject
        </Button>
      </Box>
      {isLoading ? (
        <Container sx={{ pt: 2, pb: 2 }}>
          <CircularProgress />
        </Container>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <Grid style={{ display: "flex", gap: "30px", marginTop: "30px" }}>
          {data?.subject.map((f, i) => (
            <Grid item xs={6} key={i} className="classpage-card-grid">
              <div
                onClick={() =>
                  setSearchParams({ subject: f.subjectName.toString() })
                }
              >
                <Box className="classpage-card" style={{ padding: "15px" }}>
                  <Typography
                    variant="h5"
                    color="AppWorkspace"
                    style={{ textTransform: "capitalize" }}
                  >
                    {f.subjectName}
                  </Typography>
                </Box>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
  const renderChapters = (
    <Box>
      {isLoading ? (
        <Container sx={{ pt: 2, pb: 2 }}>
          <CircularProgress />
        </Container>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <Grid container spacing={2}>
          {data?.subject
            .filter((f) => f.subjectName === currentSubject)
            .map((c, i) =>
              c.chapter.map((f) => (
                <Grid item xs={6} key={i} className="classpage-card-grid">
                  <div
                    onClick={() =>
                      setSearchParams({
                        subject: currentSubject,
                        chapter: f.chapterNo.toString(),
                      })
                    }
                  >
                    <Box className="classpage-card" style={{ padding: "20px" }}>
                      <Typography variant="h5" color="AppWorkspace">
                        chapter {f.chapterNo}
                      </Typography>
                    </Box>
                  </div>
                </Grid>
              ))
            )}
        </Grid>
      )}
    </Box>
  );
  // const renderChapterDetails = (
  //   <Grid container spacing={2}>
  //     {data?.subject
  //       .filter((f) => f.subjectName === currentSubject)
  //       .map((c) =>
  //         c?.chapter
  //           .filter((f) => f.chapterNo === currentChapter)
  //           .map((f, index) =>
  //             f.questionType.map((c, index) => (
  //               <Grid item xs={6} key={index} className="classpage-card-grid">
  //                 {currentChapter === f.chapterNo && (
  //                   <div
  //                     onClick={() => {
  //                       if (currentChapter) {
  //                         return setSearchParams({
  //                           subject: currentSubject,
  //                           chapter: currentChapter,
  //                           questionType: c,
  //                         });
  //                       }
  //                       setSearchParams({ questionType: c });
  //                     }}
  //                   >
  //                     <Box className="classpage-card">
  //                       <Typography variant="h5" color="AppWorkspace">
  //                         {c}
  //                       </Typography>
  //                     </Box>
  //                   </div>
  //                 )}
  //               </Grid>
  //             ))
  //           )
  //       )}
  //   </Grid>
  // );
  const renderSection = (
    <Grid
      container
      style={{
        display: "block",
      }}
      className="box"
    >
      {isLoading ? (
        <Container sx={{ pt: 2, pb: 2 }}>
          <CircularProgress />
        </Container>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <Box
          style={{
            display: "flex",
            alignItems: "flex-end",
            // gap: "10px",
            // paddingBottom: "10px",

            // justifyContent: "space-between",
          }}
        >
          {data?.subject
            .filter((f) => f.subjectName === currentSubject)
            .map((c) =>
              c?.chapter
                .filter((f) => f.chapterNo === currentChapter)
                .map((f, index) =>
                  f.questionType.map((c, i) => (
                    <Grid
                      item
                      xs={3}
                      key={i}
                      className="classpage-card-grid"

                      // style={{ border: "1px solid gray" }}
                    >
                      {currentChapter === f.chapterNo && (
                        <div
                          onClick={() => {
                            if (currentChapter) {
                              return setSearchParams({
                                subject: currentSubject,
                                chapter: currentChapter,
                                questionType: c,
                              });
                            }
                            setSearchParams({ questionType: c });
                          }}
                        >
                          <FillUps
                            c={c}
                            index={i}
                            current={currentQuestionType}
                          />
                        </div>
                      )}
                    </Grid>
                  ))
                )
            )}
        </Box>
      )}

      {sectionLoading ? (
        <Container sx={{ pt: 2, pb: 2 }}>
          <CircularProgress />
        </Container>
      ) : sectionError ? (
        <div>Error</div>
      ) : (
        <Box>
          {sectionData?.length !== 0 ? (
            <Box style={{ borderTop: "1px solid gray" }}>
              {sectionData?.map((c, i) =>
                c.sections.map((f, index) => {
                  return (
                    <Box key={index}>
                      {currentQuestionType === "fill-ups" &&
                        (f.questions.length !== 0 ? (
                          <FillupQuestion
                            index={i}
                            questions={f.questions}
                            _id={c._id}
                            data={c}
                            subject={currentSubject}
                            currentChapter={currentChapter}
                            questionType={currentQuestionType}
                            standard={classId}
                            refetch={refetch}
                          />
                        ) : (
                          <div>No data</div>
                        ))}
                      {currentQuestionType === "choose" &&
                        (f.questions.length && f.option.length !== 0 ? (
                          <Box>
                            <ChooseQuestion
                              questions={f.questions}
                              refetch={refetch}
                              _id={c._id}
                              option={f.option}
                              subject={currentSubject}
                              currentChapter={currentChapter}
                              questionType={currentQuestionType}
                              standard={classId}
                              index={i}
                            />
                          </Box>
                        ) : (
                          <div>No data</div>
                        ))}
                      {currentQuestionType === "match-the-following" &&
                        (f.questions.length && f.matchQuestions.length !== 0 ? (
                          <MatchQuestion
                            refetch={refetch}
                            matchQuestions={f.matchQuestions}
                            _id={c._id}
                            index={i}
                            subject={currentSubject}
                            currentChapter={currentChapter}
                            questionType={currentQuestionType}
                            standard={classId}
                            questions={f.questions}
                          />
                        ) : (
                          <div>No data</div>
                        ))}
                    </Box>
                  );
                })
              )}
            </Box>
          ) : (
            <Box style={{ textAlign: "center", marginTop: "100px" }}>
              No Data
            </Box>
          )}
        </Box>
      )}
    </Grid>
  );

  return (
    <Container sx={{ p: 2 }}>
      <Box
        sx={{ pb: 4 }}
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Breadcrumbs sx={{ fontSize: "18px" }} aria-label="breadcrumb">
          <Typography
            variant="h6"
            color="text.primary"
            style={{ cursor: "pointer" }}
            onClick={() => setSearchParams({})}
          >
            Class {classId}
          </Typography>
          {currentSubject && (
            <Typography
              variant="h6"
              color="text.primary"
              style={{ cursor: "pointer" }}
              onClick={() => setSearchParams({ subject: currentSubject })}
            >
              {currentSubject}
            </Typography>
          )}

          {currentChapter && (
            <Typography
              variant="h6"
              color="text.primary"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setSearchParams({
                  subject: currentSubject,
                  chapter: currentChapter,
                })
              }
            >
              Chapter {currentChapter}
            </Typography>
          )}

          {currentQuestionType && (
            <Typography variant="h6" color="text.primary">
              {currentQuestionType}
            </Typography>
          )}
        </Breadcrumbs>

        <Box>
          <Link to={`/class`}>
            <Button>Go back</Button>
          </Link>

          {currentChapter && (
            <Box style={{ display: "flex", gap: "20px" }}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setOpen(true)}
              >
                Add Section
              </Button>
            </Box>
          )}
          {/* {classId && (
            <Box style={{ display: "flex", gap: "20px" }}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setOpen(true)}
              >
                Add Subject
              </Button>
            </Box>
          )} */}
        </Box>
      </Box>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "80%",
            height: 500,
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              mb={2}
            >
              Set Chapter
            </Typography>
            <CloseIcon onClick={() => setOpen(false)} />
          </Box>

          {currentQuestionType === "fill-ups" && (
            <FillUpForm
              refetch={refetch}
              setOpen={setOpen}
              subject={currentSubject}
              currentChapter={currentChapter}
              questionType={currentQuestionType}
              standard={classId}
            />
          )}

          {currentQuestionType === "choose" && (
            <ChooseForm
              refetch={refetch}
              subject={currentSubject}
              setOpen={setOpen}
              currentChapter={currentChapter}
              questionType={currentQuestionType}
              standard={classId}
            />
          )}
          {currentQuestionType === "match-the-following" && (
            <MatchForm
              refetch={refetch}
              setOpen={setOpen}
              subject={currentSubject}
              currentChapter={currentChapter}
              questionType={currentQuestionType}
              standard={classId}
            />
          )}
          {classId && (
            <SubjectFrom
              standard={classId}
              refetch={refetch}
              setOpen={setOpen}
              data={data}
            />
          )}
        </Box>
      </Modal>
      {!currentSubject && renderSubjects}
      {currentSubject && !currentChapter && renderChapters}
      {/* {currentSubject &&
        currentChapter &&
        !currentQuestionType &&
        renderChapterDetails} */}
      {currentSubject &&
        currentChapter &&
        !currentQuestionType &&
        renderSection}
      {currentSubject && currentChapter && currentQuestionType && renderSection}
    </Container>
  );
};

export default ClassById;

interface IFillUps {
  c: string;
  index: any;
  current: string;
}

const FillUps: React.FC<IFillUps> = ({ c, index }) => {
  const [toggleActive, setToggleActive] = useState(index);
  // const [popup, setpopup] = useState();

  // const [lastClickedDiv, setLastClickedDiv] = useState<HTMLDivElement | null>(
  //   null
  // );

  // const handleDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   setLastClickedDiv(event.currentTarget);
  // };
  const toggleTab = (index) => {
    setToggleActive(index);
    console.log(index);
  };

  return (
    <Box
      key={index}
      className={
        toggleActive === c
          ? "classpage-card-activeBox active"
          : "classpage-card-activeBox"
      }
      onClick={() => toggleTab(c)}
      // className="classpage-card-activeBox"

      // onClick={() => setToggleActive(!toggleActive)}
      // style={{
      //   backgroundColor: toggleActive ? "red" : "transparent",
      // }}
      // key={index}
      // className={toggleActive === index ? "active" : !toggleActive}
      // onClick={() => setToggleActive(index)}
      // className={`classpage-card-activeBox ${
      //   toggleActive === index ? " active" : ""
      // }`}
      // className={
      //   toggleActive === index
      //     ? "activeBox classpage-card-activeBox"
      //     : "activeBox"
      // }
      // className={`classpage-card-activeBox ${
      //   toggleActive == index && "active"
      // }`}
      // onClick={() => setToggleActive(!toggleActive)}
      // style={{
      //   backgroundColor: toggleActive
      //     ? "red"
      //     : "" || !toggleActive
      //     ? "transparent"
      //     : "",

      // }}
    >
      <Typography
        variant="h5"
        color="AppWorkspace"
        style={{ whiteSpace: "nowrap" }}
      >
        {c}
      </Typography>
    </Box>
  );
};
