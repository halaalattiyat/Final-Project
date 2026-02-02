
/**
 * User Entity - Domain Layer
 */
export const UserRole = {
  PATIENT: 'PATIENT',
  ADMIN: 'ADMIN',
  COORDINATOR: 'COORDINATOR'
};

export class User {
  constructor({ id, email, passwordHash, role, firstName, lastName, medicalPreferences = [] }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role || UserRole.PATIENT;
    this.firstName = firstName;
    this.lastName = lastName;
    this.medicalPreferences = medicalPreferences;
    this.createdAt = new Date();
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  isAdmin() {
    return this.role === UserRole.ADMIN;
  }
}
