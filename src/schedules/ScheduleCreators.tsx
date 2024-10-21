import { FieldApi, FormApi, ReactFormApi, useForm } from "@tanstack/react-form";
import { Schedule, useScheduleContext } from "./scheduleContext";
export type ScheduleForm = FormApi<
  {
    schedules: Schedule[];
  },
  undefined
> &
  ReactFormApi<
    {
      schedules: Schedule[];
    },
    undefined
  >;

export const ScheduleCreator: React.FC = () => {
  const scheduleContext = useScheduleContext();
  const form = useForm<{ schedules: Schedule[] }>({
    defaultValues: {
      schedules: scheduleContext.schedules,
    },
    onSubmit: ({ value }) => {
      scheduleContext.setSchedules(value.schedules);
      // setSubmittedSchedules((prev) => [...prev, values]);
      // form.reset(); // Reset form after submission
    },
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Create New Schedule</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="card p-4 shadow-sm"
      >
        <div className="mb-3">
          <label className="form-label">Courses</label>
          <ScheduleFields form={form} />
        </div>
      </form>
    </div>
  );
};

export function ScheduleFields({ form }: { form: ScheduleForm }) {
  return (
    <form.Field name="schedules" mode="array">
      {(schedulesField) => (
        <>
          {schedulesField.state.value.map((_, scheduleIndex) => (
            <div key={scheduleIndex}>
              <ScheduleNameField
                form={form}
                scheduleIndex={scheduleIndex}
                schedulesField={schedulesField}
              />
              <CoursesFields form={form} scheduleIndex={scheduleIndex} />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary mt-2"
            onClick={() =>
              schedulesField.pushValue({
                name: "",
                courses: [],
              })
            }
          >
            Add Schedule
          </button>
          <button className="btn btn-outline-primary mt-2">Apply</button>
        </>
      )}
    </form.Field>
  );
}

export function ScheduleNameField({
  form,
  scheduleIndex,
  schedulesField,
}: {
  form: ScheduleForm;
  scheduleIndex: number;
  schedulesField: FieldApi<
    {
      schedules: Schedule[];
    },
    "schedules",
    undefined,
    undefined,
    Schedule[]
  >;
}) {
  return (
    <form.Field name={`schedules[${scheduleIndex}].name`}>
      {(scheduleNameField) => (
        <div>
          <label className="">
            Schedule Name
            <input
              type="text"
              className="form-control"
              value={scheduleNameField.state.value}
              onChange={(e) => scheduleNameField.handleChange(e.target.value)}
            />
          </label>
          <button
            type="button"
            className="ms-2 btn btn-outline-danger"
            onClick={() => schedulesField.removeValue(scheduleIndex)}
          >
            Remove
          </button>
        </div>
      )}
    </form.Field>
  );
}

export function CoursesFields({
  form,
  scheduleIndex,
}: {
  form: ScheduleForm;
  scheduleIndex: number;
}) {
  return (
    <form.Field name={`schedules[${scheduleIndex}].courses`} mode="array">
      {(scheduleCoursesField) => (
        <div className="ms-5">
          {scheduleCoursesField.state.value.map((_, courseIndex) => (
            <div key={courseIndex}>
              <form.Field
                name={`schedules[${scheduleIndex}].courses[${courseIndex}]`}
              >
                {(courseNameField) => (
                  <>
                    <label>
                      Course Name
                      <input
                        type="text"
                        className="form-control"
                        value={courseNameField.state.value}
                        onChange={(e) =>
                          courseNameField.handleChange(e.target.value)
                        }
                      />
                    </label>
                    <button
                      type="button"
                      className="ms-2 btn btn-outline-danger"
                      onClick={() =>
                        scheduleCoursesField.removeValue(courseIndex)
                      }
                    >
                      Remove Course
                    </button>
                  </>
                )}
              </form.Field>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary mt-2"
            onClick={() => scheduleCoursesField.pushValue("")}
          >
            Add Course
          </button>
        </div>
      )}
    </form.Field>
  );
}
