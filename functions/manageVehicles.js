import { setDoc, deleteDoc, doc } from "firebase/firestore";

async function addVehicle(db, data) {
  try {
    const docRef = doc(db, "veiculos", data.placa);
    await setDoc(docRef, data);
    console.log(`Veículo ${data.placa} adicionado ao banco de dados com sucesso`);
  } catch (error) {
    console.error("Erro ao adicionar o veículo ao banco de dados: ", error);
  }
}

async function updateVehicle(db, documentId, data) {
  try {
    const docRef = doc(db, "veiculos", documentId);
    await setDoc(docRef, data, { merge: true });
    console.log("Informações do veículo atualizadas com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar informações do veículo: ", error);
  }
}

async function deleteVehicle(db, documentId) {
  try {
    const docRef = doc(db, "veiculos", documentId);
    await deleteDoc(docRef);
    console.log(`Veículo ${documentId} removido do banco de dados`);
  } catch (error) {
    console.error("Erro ao deletar o veículo do banco de dados: ", error);
  }
}

async function listVehicles(db) {
  try {
    const querySnapshot = await getDocs(collection(db, "veiculos"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } catch (error) {
    console.error("Erro ao listar veículos: ", error);
  }
}
export { addVehicle, updateVehicle, deleteVehicle, listVehicles };