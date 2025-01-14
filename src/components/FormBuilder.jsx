import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { FormSchema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { fields: [] },
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedFields = Array.from(fields);
    const [movedItem] = reorderedFields.splice(source.index, 1);
    reorderedFields.splice(destination.index, 0, movedItem);

    setFields(reorderedFields);
  };

  const addField = (type, label) => {
    const newField = {
      type,
      id: Date.now(),
      label: ` ${label}`,
      value: "",
    };
    setFields([...fields, newField]);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div>
      <h1>FORM BUILDER</h1>
      <div className="btn_handle">
        <button className="btn" onClick={() => addField("text", "Name")}>
          Add Name Field
        </button>
        <button className="btn" onClick={() => addField("radio", "Course")}>
          Add Course Field
        </button>
        <button className="btn" onClick={() => addField("select", "Town")}>
          Add Town Field
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="form-container"
              >
                {fields.map((field, index) => (
                  <Draggable
                    key={field.id}
                    draggableId={field.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="form-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {field.type === "text" && (
                          <div>
                            <label>{field.label}</label>
                            <input
                              type="text"
                              {...register(`fields.${index}.value`)}
                              placeholder="Enter text"
                              className="form-input"
                            />
                          </div>
                        )}
                        {field.type === "select" && (
                          <div>
                            <label>{field.label}</label>
                            <select
                              {...register(`fields.${index}.value`)}
                              className="form-input"
                            >
                              <option value="">Select an option</option>
                              <option value="Town A">Town A</option>
                              <option value="Town B">Town B</option>
                              <option value="Town C">Town C</option>
                              <option value="Town D">Town D</option>
                            </select>
                          </div>
                        )}
                        {field.type === "radio" && (
                          <div className="handle_radio">
                            <label>{field.label}</label>
                            <div className="radio-group">
                              <input
                                type="radio"
                                value="Option 1"
                                {...register(`fields.${index}.value`)}
                              />
                              Option 1
                              <input
                                type="radio"
                                value="Option 2"
                                {...register(`fields.${index}.value`)}
                              />
                              Option 2
                              <input
                                type="radio"
                                value="Option 3"
                                {...register(`fields.${index}.value`)}
                              />
                              Option 3
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="btn_handle">
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBuilder;
