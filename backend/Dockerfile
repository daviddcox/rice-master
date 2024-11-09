FROM python:3.13-slim

WORKDIR /server

# installing deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./src .

# running server
CMD ["python", "app.py"]