import React from 'react';
import { Category, CategoryAdd } from './models'
import './Categories.css';
import CategoryAddForm from './dumbs/CategoryAddForm';
import CategoryList from './dumbs/CategoryList';

interface props {
  categories: Category[]
  onAdd(category: CategoryAdd): void
}

interface state {}

export default class Categories extends React.Component<props, state> {
  constructor(props: any, state: any) {
    super(props)
    this.state = {}
    this.onAdd = this.onAdd.bind(this)
  }

  onAdd(category: CategoryAdd): void {
    this.props.onAdd(category)
  }

  render(): JSX.Element {
    return (
        <div className="categoryView">
          <CategoryAddForm onAdd={this.onAdd} />
          <CategoryList categories={this.props.categories} />
        </div>
    )
  }
}