import { ModelCtor, Model } from 'sequelize';

class Abstract {
    model: ModelCtor<Model<any, any>>;
    constructor(model: ModelCtor<Model<any, any>>) {
        this.model = model;
    }

    getAll() {
        return this.model.findAll();
    }

    getById(id: number) {
        return this.model.findByPk(id);
    }

    create(data: any) {
        return this.model.create(data);
    }
}

export { Abstract };
