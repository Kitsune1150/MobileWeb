import { Student } from "./models/Student.js";
import { StudentManager } from "./managers/StudentManager.js";
import { showList } from "./utils/showList.js";

const manager = new StudentManager();
manager.loadFromLocalStorage();

function renderTable(elementId: string = "studentTableBody"): void {
  const tableBody = document.getElementById(elementId)!;
  tableBody.innerHTML = "";

  const students = manager.getAllStudents();
  showList<Student>(students);

  students.forEach((s) => {
    tableBody.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <!-- 🔴 แก้ไข -->
        <td>${s.title_name}</td>
        <td>${s.first_name}</td>
        <td>${s.last_name}</td>
        <td>${s.email}</td>
        <!-- 🔴 /แก้ไข -->
        <td>${s.year}</td>
        <td>${s.major}</td>
      </tr>
    `;
  });
}

(document.getElementById("addBtn") as HTMLButtonElement).onclick = () => {
  const id = (document.getElementById("id") as HTMLInputElement).value;
  const year = Number((document.getElementById("year") as HTMLInputElement).value);
  const major = (document.getElementById("major") as HTMLInputElement).value;

  // 🔴 แก้ไข
  const title_name = (document.getElementById("title_name") as HTMLInputElement).value;
  const first_name = (document.getElementById("first_name") as HTMLInputElement).value;
  const last_name = (document.getElementById("last_name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  // 🔴 /แก้ไข

  const student: Student = {
    id,
    title_name,
    first_name,
    last_name,
    email,
    year,
    major,
  };

  manager.addStudent(student);
  renderTable();
};

(document.getElementById("searchNameBtn") as HTMLButtonElement).onclick = () => {
  const keyword = (document.getElementById("searchName") as HTMLInputElement).value;
  const results = manager.findStudentsByName(keyword);
  showList<Student>(results);
  alert(`ผลการค้นหา: ${results.length} คน`);
};

(document.getElementById("searchMajorBtn") as HTMLButtonElement).onclick = () => {
  const keyword = (document.getElementById("searchMajor") as HTMLInputElement).value;
  const results = manager.findStudentsByMajor(keyword);
  showList<Student>(results);
  alert(`พบในสาขา: ${results.length} คน`);
};

// 🔴 เพิ่ม ค้นหาด้วย Email
(document.getElementById("searchEmailBtn") as HTMLButtonElement).onclick = () => {
  const email = (document.getElementById("searchEmail") as HTMLInputElement).value;
  const result = manager.findStudentByEmail(email);
  if (result) {
    showList<Student>([result]);
    alert(`พบอีเมล: ${result.first_name} ${result.last_name}`);
  } else {
    alert("ไม่พบอีเมลนี้");
  }
};
// 🔴 /เพิ่ม

renderTable("studentTableBody");
