import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddNewDialog from "../AddNewDialog";

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

/**
Given I navigate to the user interface and create a PAL SD Video Reel
When I try and add NTSC SD video clip
Then user interface should prevent me from doing this action
 */
test("should prevent adding NTSC SD video clip in PAL SD Video Reel", () => {
  render(<AddNewDialog open={true} />);
  const name = screen.getByTestId("AddNewDialog.Name");
  fireEvent.change(name, { target: { id: "name", value: "TESTING_SHOWREEL" } });

  const standard = screen.getByTestId("AddNewDialog.Standard");
  fireEvent.change(standard, { target: { id: "standard", value: "PAL" } });

  const definition = screen.getByTestId("AddNewDialog.Definition");
  fireEvent.change(definition, { target: { id: "definition", value: "SD" } });

  const nextButton = screen.getByTestId("AddNewDialog.Next");
  fireEvent.click(nextButton);

  const standardList = screen.getAllByTestId("AddNewDialog.Clips.Standard");
  const definitionList = screen.getAllByTestId("AddNewDialog.Clips.Definition");
  const hasNTSC = !!standardList.find(
    (standard) => standard.textContent === "Standard: NTSC"
  );
  const hasSD = !!definitionList.find(
    (definition) => definition.textContent === "Definition: SD"
  );

  expect(hasNTSC && hasSD).toBeFalsy();
});

/**
Given I navigate to the user interface and create a PAL SD Video Reel
When I try and add PAL HD video clip
Then user interface should prevent me from doing this action
 */
test("should prevent adding PAL HD video clip in PAL SD Video Reel", () => {
  render(<AddNewDialog open={true} />);
  const name = screen.getByTestId("AddNewDialog.Name");
  fireEvent.change(name, { target: { id: "name", value: "TESTING_SHOWREEL" } });

  const standard = screen.getByTestId("AddNewDialog.Standard");
  fireEvent.change(standard, { target: { id: "standard", value: "PAL" } });

  const definition = screen.getByTestId("AddNewDialog.Definition");
  fireEvent.change(definition, { target: { id: "definition", value: "SD" } });

  const nextButton = screen.getByTestId("AddNewDialog.Next");
  fireEvent.click(nextButton);

  const standardList = screen.getAllByTestId("AddNewDialog.Clips.Standard");
  const definitionList = screen.getAllByTestId("AddNewDialog.Clips.Definition");
  const hasNTSC = !!standardList.find(
    (standard) => standard.textContent === "Standard: PAL"
  );
  const hasSD = !!definitionList.find(
    (definition) => definition.textContent === "Definition: HD"
  );

  expect(hasNTSC && hasSD).toBeFalsy();
});

/**
Given I navigate to the user interface and create a PAL SD Video Reel
When I add all the PAL SD video clips
Then the total duration displayed is 00:02:11:01
 */
test("should show 00:02:11:01 as total duration when adding all PAL SD video clips", () => {
  render(<AddNewDialog open={true} />);
  const name = screen.getByTestId("AddNewDialog.Name");
  fireEvent.change(name, { target: { id: "name", value: "TESTING_SHOWREEL" } });

  const standard = screen.getByTestId("AddNewDialog.Standard");
  fireEvent.change(standard, { target: { id: "standard", value: "PAL" } });

  const definition = screen.getByTestId("AddNewDialog.Definition");
  fireEvent.change(definition, { target: { id: "definition", value: "SD" } });

  const nextButton = screen.getByTestId("AddNewDialog.Next");
  fireEvent.click(nextButton);

  const checkboxList = screen.getAllByTestId("AddNewDialog.Clips.Checkbox");

  checkboxList.forEach((checkbox) => {
    fireEvent.click(checkbox);
  });

  const totalDuration = screen.getByTestId("AddNewDialog.Clips.TotalDuration");

  expect(totalDuration.textContent).toBe(
    "Total Duration of Showreel: 00:02:11:01"
  );
});

/**
Given I navigate to the user interface and create a NTSC SD Video Reel
When I add all the NTSC SD video clips
Then the total duration displayed is 00:00:54:08
 */
test("should show 00:00:54:08 as total duration when adding all NTSC SD video clips", () => {
  render(<AddNewDialog open={true} />);
  const name = screen.getByTestId("AddNewDialog.Name");
  fireEvent.change(name, { target: { id: "name", value: "TESTING_SHOWREEL" } });

  const standard = screen.getByTestId("AddNewDialog.Standard");
  fireEvent.change(standard, { target: { id: "standard", value: "NTSC" } });

  const definition = screen.getByTestId("AddNewDialog.Definition");
  fireEvent.change(definition, { target: { id: "definition", value: "SD" } });

  const nextButton = screen.getByTestId("AddNewDialog.Next");
  fireEvent.click(nextButton);

  const checkboxList = screen.getAllByTestId("AddNewDialog.Clips.Checkbox");

  checkboxList.forEach((checkbox) => {
    fireEvent.click(checkbox);
  });

  const totalDuration = screen.getByTestId("AddNewDialog.Clips.TotalDuration");

  expect(totalDuration.textContent).toBe(
    "Total Duration of Showreel: 00:00:54:08"
  );
});
