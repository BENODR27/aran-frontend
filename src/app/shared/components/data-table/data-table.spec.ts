import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTable, DataTableColumn } from './data-table';

interface TestRow {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  imports: [DataTable],
  template: '<app-data-table [columns]="columns" [rows]="rows" [pageSize]="1" />',
})
class HostComponent {
  readonly rows: readonly TestRow[] = [
    { id: 1, name: 'Alpha' },
    { id: 2, name: 'Beta' },
  ];
  readonly columns: readonly DataTableColumn<TestRow>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
  ];
}

describe('DataTable', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
  });

  it('renders the first page and pagination controls', () => {
    expect(fixture.nativeElement.textContent).toContain('Alpha');
    expect(fixture.nativeElement.textContent).not.toContain('Beta');
    expect(fixture.nativeElement.textContent).toContain('Next');
  });
});
