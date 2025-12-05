# Simple Email Campaign Manager

A minimal **Email Campaign Manager** built with **Laravel (Backend)**, **React + InertiaJS (Frontend)**, and **shadcn/ui** components.  
This project allows you to manage contacts, create email campaigns, and track email delivery status (fake sending via queued jobs).

---

## **Features**

### Contacts
- Seed a list of contacts (name + email)
- Display contacts in a table
- Select recipients (single, multiple, select all)

### Campaigns
- Create a campaign with subject and body (rich text or textarea)
- Select recipients from the contact list
- Queue emails for sending (simulated using Laravel jobs)

### Email Status Tracking
- Track status per recipient: `pending`, `sent`, `failed`
- View campaign history and per-campaign delivery results

### Architecture
- **Service Classes** for business logic
- **Actions / Jobs** for email sending
- **Value Objects** for structured data handling
- Clean **React + InertiaJS** components
- Validation and error handling in Laravel

---

## **Tech Stack**

- Backend: [Laravel](https://laravel.com/)
- Frontend: [React](https://reactjs.org/) + [InertiaJS](https://inertiajs.com/)
- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- Database: MySQL
- Queue: Database (Laravel Queue)

---

## **Installation**

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/simple-campaign-manager.git
cd simple-campaign-manager
