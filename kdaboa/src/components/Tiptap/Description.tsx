import Button from "@mui/material/Button";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuButtonUnderline,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useState, useRef } from "react";
import api from "../../api/api";


interface DescriptionProps {
  description?: string;
}

export const Description = () => {
  const rteRef = useRef<RichTextEditorRef>(null);
  const [description, setDescription] = useState<string>("");

  const pegaDesc = async () => {
    try {
      const response = await api.get<DescriptionProps>('/gerente/establishment', { withCredentials: true });
      setDescription(response.data.description || "");
    } catch (error) {
      console.error("Error fetching description:", error);
    }
  }
  return (
    <div>
      <RichTextEditor
        ref={rteRef}
        extensions={[StarterKit]} // Or any Tiptap extensions you wish!
        content={<p>{description}</p>} // Initial content for the editor
        // Optionally include `renderControls` for a menu-bar atop the editor:
        renderControls={() => (
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuButtonUnderline/>
                    
          </MenuControlsContainer>
        )}
      />

      <Button onClick={() => console.log(rteRef.current?.editor?.getHTML())}>
        Log HTML
      </Button>
    </div>
  );
}