//current year
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

//last modified date
const lastMod = new Date(document.lastModified);
const formattedDate = `${lastMod.getMonth() + 1}/${lastMod.getDate()}/${lastMod.getFullYear()} ${String(lastMod.getHours()).padStart(2, '0')}:${String(lastMod.getMinutes()).padStart(2, '0')}:${String(lastMod.getSeconds()).padStart(2, '0')}`;
document.getElementById("lastModified").textContent = `Last Modified: ${formattedDate}`;

