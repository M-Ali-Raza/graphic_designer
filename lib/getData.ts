import fs from 'fs';
import path from 'path';

export function getEducationData() {
  const filePath = path.join(process.cwd(), 'data/education.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export function getContactData() {
  const filePath = path.join(process.cwd(), 'data/contact.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export function getServicesData() {
  const filePath = path.join(process.cwd(), 'data/services.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export function getNavbarData() {
  const filePath = path.join(process.cwd(), 'data/navbar.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}
