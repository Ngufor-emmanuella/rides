# rides
Car rental application . that allows drivers to input the revenus derieved from different cars on different days . These revenus are calculated to give a total sum which will determine if the bussiness is making profit or not.


# My Django REST Framework Application

## Prerequisites
- Python 3.x
- pip (Python package installer)

## Setup Instructions

1. Clone the repository:
    ```
    git clone <repository-url>
    cd <repository-folder>
    ```

2. Create a virtual environment:
    ```
    python -m venv venv
    ```

3. Activate the virtual environment:
    - On Windows: 
      ```
      venv\Scripts\activate
      ```
    - On macOS/Linux: 
      ```
      source venv/bin/activate
      ```

4. Install dependencies:
    ```
    pip install -r requirements.txt
    ```

5. Run migrations:
    ```
    python manage.py migrate
    ```

6. Create a superuser (optional):
    ```
    python manage.py createsuperuser
    ```

7. Start the development server:
    ```
    python manage.py runserver
    ```
    
8. Visit `http://127.0.0.1:8000` in your browser.

