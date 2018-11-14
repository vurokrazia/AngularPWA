import { Injectable } from '@angular/core';
import { IList } from '../structures/lists';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from './auth.services';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';



@Injectable()
export class ListService {
    public uid: string;
    public listsColletion: AngularFirestoreCollection<IList>;
    public lists: Observable<IList[]>;

    constructor(public afs: AngularFirestore, private auth: AuthService) {
        this.auth.getUser().subscribe(user => {
            this.uid = user.uid;
            if (this.uid) {
                this.setCollection();
            }
        });
    }
    setCollection() {
        this.listsColletion = this.afs.collection('users').doc(this.uid).collection<IList>('lists');
        this.lists = this.listsColletion.snapshotChanges().map(actions => {
            return actions.map(item => {
                const data = item.payload.doc.data() as IList;
                const id   = item.payload.doc.id;
                return {...data, id};
            });
        });
    }
    add(list: IList): Promise<any> {
        if (!this.listsColletion) {
            throw Error('Set a collection before trying to add a new document');
        }
        const createAt = firebase.firestore.FieldValue.serverTimestamp();
        list.createAt = createAt;
        return this.listsColletion.add(list);
    }

}