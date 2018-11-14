import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { ITodo } from '../structures/todos';
import * as firebase from 'firebase/app';

@Injectable()
export class TodoService {
    private collection: AngularFirestoreCollection<ITodo>;
    private ref: Observable<DocumentChangeAction<ITodo>[]>;
    private listId: string;
    constructor(private afs: AngularFirestore) {

    }
    setColletion(listId: string) {
        this.listId = listId;
        this.collection = this.afs.collection('lists').doc(listId).collection('todos');
        this.ref = this.collection.snapshotChanges();
    }
    getFromList(listId: string): Observable<ITodo[]> {
        if (!this.collection || this.listId != listId) {
            this.setColletion(listId);
        }
        return this.ref.map(actions => {
            return actions.map( item => {
                const data = item.payload.doc.data() as ITodo;
                const id = item.payload.doc.id;
                return {...data, id};
            })
        })
    }
    add(listId: string, todo: ITodo): Promise<any> {
        if (!this.collection || this.listId != listId) {
            this.setColletion(listId);
        }
        const createAt = firebase.firestore.FieldValue.serverTimestamp();
        todo.createdAt = createAt;
        return this.collection.add(todo);
    }
}
