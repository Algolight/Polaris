// import { Card, OptionList } from "@shopify/polaris";
// import { useState } from "react";
// 
// function OptionListExample() {
//   const [selected, setSelected] = useState([]);
// 
//   return (
//     <Card>
//       <OptionList
//         title="Inventory Location"
//         onChange={setSelected}
//         options={[
//           { value: "byward_market", label: "Byward Market" },
//           { value: "centretown", label: "Centretown" },
//           { value: "hintonburg", label: "Hintonburg" },
//           { value: "westboro", label: "Westboro" },
//           { value: "downtown", label: "Downtown" },
//         ]}
//         selected={selected}
//       />
//     </Card>
//   );
// }
// 
import { withPolarisExample } from "../../components/PolarisExamplePage";
export default withPolarisExample(() => <p>Polaris Example Tk</p>);