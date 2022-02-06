import nookies, { parseCookies } from "nookies";
import Questions from "../../../components/Questions";
import { adminGetUserRequest } from "../../../lib/axios";

const User = ({ result: { user, questions } }) => {
  return (
    <div className="flex flex-col justify-center items-center m-6">
      <div>
        <p>username: {user.userId.username}</p>
        <p>name: {user.userId.name}</p>
        <p>mobile: {user.userId.phone}</p>
        <p>email: {user.userId.email}</p>
        <p>gender: {user.userId.gender}</p>
        <p>tech round: {user.techRound}</p>
        <p>management round: {user.techRound}</p>
        <p>design round: {user.techRound}</p>
        {user.checkedBy !== "" ? (
          <p>Corrected by: {user.checkedBy.toString()}</p>
        ) : null}
        {user.portfolio.map((port, i) => (
          <p key={i}>
            {port.category} :{" "}
            <a
              href={port.link}
              target="_blank"
              rel="noreferrer"
              className="truncate"
            >
              {port.link}
            </a>
          </p>
        ))}
      </div>
      {user.domainsAttempted.map((dom) => {
        let ques;
        let isChecking;
        switch (dom.domain) {
          case "tech":
            ques = user.techAttempted.map((que) => ({
              quesId:
                questions[questions.map((q) => q._id).indexOf(que.quesId)],
              answer: que.answer,
            }));
            isChecking = user.isChecking.tech || user.checked.tech;
            break;
          case "management":
            ques = user.managementAttempted.map((que) => ({
              quesId:
                questions[questions.map((q) => q._id).indexOf(que.quesId)],
              answer: que.answer,
            }));
            isChecking = user.isChecking.management || user.checked.management;
            break;
          case "design":
            ques = user.designAttempted.map((que) => ({
              quesId:
                questions[questions.map((q) => q._id).indexOf(que.quesId)],
              answer: que.answer,
            }));
            isChecking = user.isChecking.design || user.checked.design;
            break;
          case "video":
            ques = user.videoAttempted.map((que) => ({
              quesId:
                questions[questions.map((q) => q._id).indexOf(que.quesId)],
              answer: que.answer,
            }));
            isChecking = user.isChecking.video || user.checked.video;
            break;
          default:
            break;
        }
        return (
          <Questions
            isChecking={isChecking}
            user={user}
            domain={dom.domain}
            questions={ques}
            key={dom.domain}
          />
        );
      })}
    </div>
  );
};

export default User;

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);
  const {
    query: { user },
  } = ctx;
  const { success, result } = await adminGetUserRequest(cookies, user);
  if (!success) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  return { props: { result } };
}
