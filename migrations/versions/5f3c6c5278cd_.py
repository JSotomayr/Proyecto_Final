"""empty message

Revision ID: 5f3c6c5278cd
Revises: 
Create Date: 2021-12-06 11:24:28.284885

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5f3c6c5278cd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('customer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('_password', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('country', sa.String(), nullable=False),
    sa.Column('city', sa.String(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('image', sa.Text(), nullable=True),
    sa.Column('_is_active', sa.Boolean(), nullable=False),
    sa.Column('_is_brewerie', sa.Boolean(), nullable=False),
    sa.Column('_is_admin', sa.Boolean(), nullable=False),
    sa.Column('friend_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['friend_id'], ['customer.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('brewer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('lastname', sa.String(), nullable=False),
    sa.Column('id_customer', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_customer'], ['customer.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id_customer')
    )
    op.create_table('review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('review_content', sa.Text(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('publishment_date', sa.DATE(), nullable=True),
    sa.Column('_is_beer', sa.Boolean(), nullable=False),
    sa.Column('brewer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['brewer_id'], ['brewer.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('beer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('brand', sa.String(), nullable=False),
    sa.Column('variety', sa.String(), nullable=False),
    sa.Column('style', sa.Enum('Lager', 'Extra Lager', 'Lager Especial', 'Tostada', 'Märzenbier', 'Pilsner', 'Negra', 'IPA', 'Trigo', name='enum_style'), nullable=False),
    sa.Column('origin', sa.Enum('España', 'Alemania', 'Francia', 'Italia', 'Portugal', 'Holanda', 'Bélgica', 'Polonia', 'USA', name='enum_origin'), nullable=False),
    sa.Column('obv', sa.FLOAT(), nullable=False),
    sa.Column('drinking_temperature', sa.String(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('image', sa.Text(), nullable=False),
    sa.Column('publishment_date', sa.DATE(), nullable=False),
    sa.Column('review_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['review_id'], ['review.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('brewerie',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('company_name', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('id_customer', sa.Integer(), nullable=False),
    sa.Column('review_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_customer'], ['customer.id'], ),
    sa.ForeignKeyConstraint(['review_id'], ['review.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id_customer')
    )
    op.create_table('event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('date', sa.DATE(), nullable=True),
    sa.Column('country', sa.String(), nullable=False),
    sa.Column('city', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('image', sa.Text(), nullable=False),
    sa.Column('brewerie_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['brewerie_id'], ['brewerie.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('brewerie_id')
    )
    op.create_table('favourite_beer',
    sa.Column('brewer_id', sa.Integer(), nullable=False),
    sa.Column('beer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['beer_id'], ['beer.id'], ),
    sa.ForeignKeyConstraint(['brewer_id'], ['brewer.id'], ),
    sa.PrimaryKeyConstraint('brewer_id', 'beer_id')
    )
    op.create_table('favourite_brewerie',
    sa.Column('brewer_id', sa.Integer(), nullable=False),
    sa.Column('brewerie_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['brewer_id'], ['brewer.id'], ),
    sa.ForeignKeyConstraint(['brewerie_id'], ['brewerie.id'], ),
    sa.PrimaryKeyConstraint('brewer_id', 'brewerie_id')
    )
    op.create_table('pending_beer',
    sa.Column('brewer_id', sa.Integer(), nullable=False),
    sa.Column('beer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['beer_id'], ['beer.id'], ),
    sa.ForeignKeyConstraint(['brewer_id'], ['brewer.id'], ),
    sa.PrimaryKeyConstraint('brewer_id', 'beer_id')
    )
    op.create_table('wishlist_beer',
    sa.Column('brewer_id', sa.Integer(), nullable=False),
    sa.Column('beer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['beer_id'], ['beer.id'], ),
    sa.ForeignKeyConstraint(['brewer_id'], ['brewer.id'], ),
    sa.PrimaryKeyConstraint('brewer_id', 'beer_id')
    )
    op.create_table('brewer_go_to_event',
    sa.Column('brewer_id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['brewer_id'], ['brewer.id'], ),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.PrimaryKeyConstraint('brewer_id', 'event_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('brewer_go_to_event')
    op.drop_table('wishlist_beer')
    op.drop_table('pending_beer')
    op.drop_table('favourite_brewerie')
    op.drop_table('favourite_beer')
    op.drop_table('event')
    op.drop_table('brewerie')
    op.drop_table('beer')
    op.drop_table('review')
    op.drop_table('brewer')
    op.drop_table('customer')
    # ### end Alembic commands ###
