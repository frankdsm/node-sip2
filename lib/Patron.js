'use strict';

class Patron {

  constructor() {
    this.name = '';
    this.type = '';
    this.fines = '';
    this.message = '';
    this.pin = '';
    this.address = '';
    this.phone = '';
    this.email = '';
  }

  get name() {
    return this.name;
  }

  set name(value) {
    this.name = value;
  }

  get type() {
    return this.type;
  }

  set type(value) {
    this.type = value;
  }

  get fines() {
    return this.fines;
  }
  set fines(value) {
    this.fines = value;
  }

  get message() {
    return this.message;
  }
  set message(value) {
    this.message = value;
  }

  get pin() {
    return this.pin;
  }

  set pin(value) {
    this.pin = value;
  }

  get address() {
    return this.address;
  }

  set address(value) {
    this.address = value;
  }

  get phone() {
    return this.phone;
  }

  set phone(value) {
    this.phone = value;
  }

  get email() {
    return this.email;
  }

  set email(value) {
    this.email = value;
  }

}

module.exports = Patron;
