import { useParams } from "react-router-dom";
import { useGetInfoMaterial } from "../../api/hooks/course/useGetInfoMaterial";
import { CurrentMaterialItem } from "./CurrentMaterialItem";
import { MaterialWrapper } from "./CurrentMaterial.styled";
import Loading from "../UI/Loading/Loading";

const CurrentMaterial = () => {
  const materialId = useParams().material_id;
  const { data } = useGetInfoMaterial(materialId);

  return data ? (
    <MaterialWrapper>
      <h2>{data?.material[0].title}</h2>
      {data.content
        .sort((a, b) => a.id - b.id)
        .map((content) => (
          <div key={content.id}>
            <CurrentMaterialItem content={content} />
          </div>
        ))}
    </MaterialWrapper>
  ) : (
    <Loading />
  );
};

export default CurrentMaterial;
