## Prerequisites

Download and unzip Elasticsearch at https://www.elastic.co/downloads/elasticsearch
```bash
$ cd [path to where elasticsearch is installed]/bin
$ plugin install elasticsearch/elasticsearch-mapper-attachments/3.0.2
$ service install
$ service start
```

```bash
DELETE http://localhost:9200/cv_manager

POST http://localhost:9200/cv_manager
{
  "mappings": {
    "applicant": {
      "properties": {
        "cv": { "type": "attachment",
                "fields" : {
                    "title" : {"store" : "true"},
                    "date" : {"store" : "true"},
                    "name" : {"store" : "true"},
                    "author" : {"store" : "true"},
                    "keywords" : {"store" : "true"},
                    "content_type" : {"store" : "true"},
                    "content_length" : {"store" : "true"},
                    "language" : {"store" : "true"}
                }
        }
}}}}
```

## Install & Build

```bash
$ git clone https://[user_name]@bitbucket.org/jonathanduggan/cv-manager.git 
$ cd cv-manager 
$ npm start
```

## Run

```bash
http://localhost:3003/
```